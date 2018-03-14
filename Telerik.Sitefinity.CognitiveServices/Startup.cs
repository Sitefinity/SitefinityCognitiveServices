using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using Telerik.Sitefinity.Abstractions;
using Telerik.Sitefinity.Configuration;
using Telerik.Sitefinity.Data;
using Telerik.Sitefinity.Services;

namespace Telerik.Sitefinity.CognitiveServices
{
    /// <summary>
    /// Contains the application startup event handlers registering the required components for the packaging module of Sitefinity.
    /// </summary>
    [ExcludeFromCodeCoverage]
    public static class Startup
    {
        /// <summary>
        /// Called before the Asp.Net application is started. Subscribes for the logging and exception handling configuration related events.
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        public static void OnPreApplicationStart()
        {
            Bootstrapper.Initialized -= Bootstrapper_Initialized;
            Bootstrapper.Initialized += Bootstrapper_Initialized;
        }

        private static void Bootstrapper_Initialized(object sender, ExecutedEventArgs e)
        {
            if (e.CommandName == "Bootstrapped")
            {
                SystemManager.ApplicationStart += SystemManager_ApplicationStart;
            }
        }

        static void SystemManager_ApplicationStart(object sender, System.EventArgs e)
        {
            if (!Startup.IsModuleRegistered())
            {
                Startup.RegisterModule();
            }
        }

        private static bool IsModuleRegistered()
        {
            SystemConfig systemConfig = Config.Get<SystemConfig>();
            if (!systemConfig.ApplicationModules.ContainsKey(CognitiveServicesModule.ModuleName))
            {
                return false;
            }

            return true;
        }

        private static void RegisterModule()
        {
            SystemManager.RunWithElevatedPrivilege(d =>
            {
                var configManager = ConfigManager.GetManager();
                var systemConfig = configManager.GetSection<SystemConfig>();

                systemConfig.ApplicationModules.Add(new AppModuleSettings(systemConfig.ApplicationModules)
                {
                    Name = CognitiveServicesModule.ModuleName,
                    Title = "Cognitive Services",
                    Description = "Enables integration between Sitefinity and different cognitive services.",
                    Type = typeof(CognitiveServicesModule).AssemblyQualifiedName,
                    StartupType = StartupType.OnApplicationStart
                });

                configManager.SaveSection(systemConfig);
            });
        }
    }
}