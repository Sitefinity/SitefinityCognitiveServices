using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Routing;
using Telerik.Microsoft.Practices.Unity;
using Telerik.Sitefinity.Abstractions;
using Telerik.Sitefinity.CognitiveServices.Configuration;
using Telerik.Sitefinity.CognitiveServices.Handlers;
using Telerik.Sitefinity.CognitiveServices.Processors;
using Telerik.Sitefinity.CognitiveServices.Providers;
using Telerik.Sitefinity.CognitiveServices.ServiceClients;
using Telerik.Sitefinity.Configuration;
using Telerik.Sitefinity.Data;
using Telerik.Sitefinity.Modules.Libraries.Configuration;
using Telerik.Sitefinity.Modules.Libraries.Data;
using Telerik.Sitefinity.Services;

namespace Telerik.Sitefinity.CognitiveServices
{
    public class CognitiveServicesModule : ModuleBase
    {
        public override Guid LandingPageId
        {
            get { return CognitiveServicesModule.PageId; }
        }

        /// <inheritdoc />
        public override void Initialize(ModuleSettings settings)
        {
            App.WorkWith()
                .Module(CognitiveServicesModule.ModuleName)
                .Initialize()
                .Configuration<CognitiveServicesConfig>();

            base.Initialize(settings);
            this.RegisterIocTypes();
        }

        public override Type[] Managers
        {
            get
            {
                return new Type[0];
            }
        }

        /// <summary>
        /// Integrate the module into the system.
        /// </summary>
        public override void Load()
        {
            base.Load();

            Bootstrapper.Initialized -= this.Bootstrapper_Initialized;
            Bootstrapper.Initialized += this.Bootstrapper_Initialized;
        }

        private void Bootstrapper_Initialized(object sender, ExecutedEventArgs e)
        {
            if (e.CommandName == "Bootstrapped" && SystemManager.GetModule(CognitiveServicesModule.ModuleName) != null)
            {
                var configManager = ConfigManager.GetManager();
                configManager.Provider.Executed += this.ConfigEventHandler;

                if (defaultApiRoute == null)
                {
                    defaultApiRoute = RouteTable.Routes.MapHttpRoute(
                        name: "DefaultApi",
                        routeTemplate: "webapi/{controller}/{action}/{id}",
                        defaults: new { id = RouteParameter.Optional });
                }

                if (!this.IsCustomLibrariesProviderRegistered())
                {
                    this.RegisterCustomLibrariesProvider();
                    SystemManager.RestartApplication("Restart to enable custom libraries provider", SystemRestartFlags.Default, true);
                }

                if (this.ModuleHasRequiredSettings())
                {
                    var imageHandler = ObjectFactory.Container.Resolve<ImageHandler>();
                    imageHandler.Initialzie();
                }
            }
        }

        /// <summary>
        /// Handles the event for config update.
        /// </summary>
        /// <param name="configEvent">The config change event args.</param>
        private void ConfigEventHandler(object sender, ExecutedEventArgs e)
        {
            bool isConfigUpdated = e.CommandArguments is CognitiveServicesConfig;
            if (!isConfigUpdated)
            {
                return;
            }

            this.DisposeSingletonInstances();

            var imageHandler = ObjectFactory.Container.Resolve<ImageHandler>();
            if (this.ModuleHasRequiredSettings())
            {
                imageHandler.Initialzie();
            }
        }

        /// <summary>
        /// Checks whether the Cognitive Services config has the required settings.
        /// </summary>
        /// <returns>Returns true if the config has the required settings. Otherwise, false.</returns>
        private bool ModuleHasRequiredSettings()
        {
            CognitiveServicesConfig config = Config.Get<CognitiveServicesConfig>();

            return this.ModuleHasRequiredSettings(config);
        }

        /// <summary>
        /// Checks whether the Cognitive Services config has the required settings.
        /// </summary>
        /// <param name="config">The Cognitive Services config object.</param>
        /// <returns>Returns true if the config has the required settings. Otherwise, false.</returns>
        private bool ModuleHasRequiredSettings(CognitiveServicesConfig config)
        {
            if (string.IsNullOrWhiteSpace(config.AzureComputerVisionApiServiceUriBase))
            {
                return false;
            }

            if (string.IsNullOrWhiteSpace(config.AzureComputerVisionApiSubscriptionKey))
            {
                return false;
            }

            return true;
        }

        private bool IsCustomLibrariesProviderRegistered()
        {
            LibrariesConfig librariesConfig = Config.Get<LibrariesConfig>();

            if (!librariesConfig.Providers.ContainsKey(CognitiveServicesModule.OpenAccessDataProviderName))
            {
                return false;
            }

            if (librariesConfig.Providers[CognitiveServicesModule.OpenAccessDataProviderName].ProviderType != typeof(CustomOpenAccessLibrariesProvider))
            {
                return false;
            }

            return true;
        }

        private void RegisterCustomLibrariesProvider()
        {
            SystemManager.RunWithElevatedPrivilege(d =>
            {
                var configManager = ConfigManager.GetManager();
                var librariesConfig = configManager.GetSection<LibrariesConfig>();

                librariesConfig.Providers[CognitiveServicesModule.OpenAccessDataProviderName].ProviderType = typeof(CustomOpenAccessLibrariesProvider);

                configManager.SaveSection(librariesConfig);
            });
        }

        private void UnregisterCustomLibrariesProvider()
        {
            SystemManager.RunWithElevatedPrivilege(d =>
            {
                var configManager = ConfigManager.GetManager();
                var librariesConfig = configManager.GetSection<LibrariesConfig>();

                librariesConfig.Providers[CognitiveServicesModule.OpenAccessDataProviderName].ProviderType = typeof(OpenAccessLibrariesProvider);

                configManager.SaveSection(librariesConfig);
            });
        }

        /// <inheritdoc />
        public override void Unload()
        {
            RouteTable.Routes.Remove(defaultApiRoute);

            this.DisposeSingletonInstances();

            base.Unload();
        }

        /// <inheritdoc />
        public override void Install(SiteInitializer initializer)
        {
            // Install logic goes here
        }

        public override void Uninstall(SiteInitializer initializer)
        {
            RouteTable.Routes.Remove(defaultApiRoute);

            this.DisposeSingletonInstances();

            if (this.IsCustomLibrariesProviderRegistered())
            {
                this.UnregisterCustomLibrariesProvider();
                SystemManager.RestartApplication("Restart to disable custom libraries provider", SystemRestartFlags.Default, true);
            }

            base.Uninstall(initializer);
        }

        protected override ConfigSection GetModuleConfig()
        {
            return Config.Get<CognitiveServicesConfig>();
        }

        private void DisposeSingletonInstances()
        {
            foreach (ContainerControlledLifetimeManager containerControlledLifetimeManager in this.containerControlledLifetimeManagers)
            {
                containerControlledLifetimeManager.RemoveValue();
            }
        }

        private void RegisterIocTypes()
        {
            ContainerControlledLifetimeManager visionServiceLifetimeManager = new ContainerControlledLifetimeManager();
            ObjectFactory.Container.RegisterType<IVisionClient, VisionClient>(visionServiceLifetimeManager);
            this.containerControlledLifetimeManagers.Add(visionServiceLifetimeManager);

            ContainerControlledLifetimeManager imageHandlerLifetimeManager = new ContainerControlledLifetimeManager();
            ObjectFactory.Container.RegisterType<ImageHandler>(imageHandlerLifetimeManager);
            this.containerControlledLifetimeManagers.Add(imageHandlerLifetimeManager);

            ObjectFactory.Container.RegisterType<ICognitiveImageProcessor, CognitiveImageProcessor>(ModuleName);
        }

        /// <summary>
        /// The name of this module
        /// </summary>
        public const string ModuleName = "CognitiveServices";
       
        internal static readonly Guid PageId = new Guid("9428aa5e-dfdf-4a67-9154-02b117e2b145");

        private const string OpenAccessDataProviderName = "OpenAccessDataProvider";

        private IList<ContainerControlledLifetimeManager> containerControlledLifetimeManagers = new List<ContainerControlledLifetimeManager>();

        private static Route defaultApiRoute = null;
    }
}
