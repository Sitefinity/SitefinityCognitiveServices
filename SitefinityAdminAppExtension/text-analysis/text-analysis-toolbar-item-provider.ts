import { ClassProvider, ComponentFactoryResolver, Injector, Inject } from '@angular/core';
import { ToolBarItem, EditorConfigProvider, TOOLBARITEMS_TOKEN } from 'progress-sitefinity-adminapp-sdk/app/api/v1';
import { TextAnalysisComponent } from "./text-analysis.component";
import { ComponentRef } from '@angular/core/src/linker/component_factory';

require("!style-loader!css-loader!./toolbar.css");

class TextAnalysisToolBarItemProvider implements EditorConfigProvider {    
    protected textAnalysisComponent: ComponentRef<TextAnalysisComponent>;
    
    constructor(
        @Inject(ComponentFactoryResolver) private componentFactoryResolver: ComponentFactoryResolver,
        @Inject(Injector) private injector: Injector) { }
    
    /**
     * The method that gets invoked when the editor constructs the toolbar actions.
     *
     * @param {*} editorHost The Kendo's editor object.
     * @returns {ToolBarItem[]} The custom toolbar items that will be added to the Kendo's toolbar.
     * @memberof TextAnalysisToolBarItemsProvider
     */
    getToolBarItems(editorHost: any): ToolBarItem[] {
        var textAnalyticsNode = document.createElement("div");
        textAnalyticsNode.id = "text-analytics";
        editorHost.context.parentElement.appendChild(textAnalyticsNode);

        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(TextAnalysisComponent);
        this.textAnalysisComponent = componentFactory.create(this.injector, [], textAnalyticsNode);
        this.textAnalysisComponent.instance.editorHost = editorHost;
        this.textAnalysisComponent.changeDetectorRef.detectChanges();

        const TEXT_ANALYSIS_TOOLBAR_ITEM: ToolBarItem = {
            name: "text-analysis",
            tooltip: "Text Analysis",
            ordinal: 999,
            exec: () => {
                this.textAnalysisComponent.instance.isVisible = !this.textAnalysisComponent.instance.isVisible;
                this.textAnalysisComponent.changeDetectorRef.detectChanges();
            }
        };

        return [TEXT_ANALYSIS_TOOLBAR_ITEM];
    }

    /**
     * If you want to remove some toolbar items return their names as strings in the array. Order is insignificant.
     * Otherwise return an empty array.
     * Example: return [ "embed" ];
     * The above code will remove the embed toolbar item from the editor.
     *
     * @returns {string[]}
     * @memberof SwitchTextDirectionProvider
     */
    getToolBarItemsNamesToRemove(): string[] {
        return [];
    }

    /**
     * This gives access to the Kendo UI Editor configuration object
     * that is used to initialize the editor upon creation
     * Kendo UI Editor configuration Overiview documentation -> https://docs.telerik.com/kendo-ui/controls/editors/editor/overview#configuration
     *
     * @param {*} configuration
     * @returns The modified configuration.
     * @memberof SwitchTextDirectionProvider
     */
    configureEditor(configuration: any): any {
        return configuration;
    }
}

/**
 * The provider registration for Angular's DI
 */
export const TEXT_ANALYSIS_TOOLBAR_ITEM_PROVIDER: ClassProvider = {
    multi: true,
    provide: TOOLBARITEMS_TOKEN,
    useClass: TextAnalysisToolBarItemProvider
};
