import { Component, Input, Output, EventEmitter, Renderer, ContentChild, HostListener, ViewChild } from '@angular/core';
import { TreeModel } from '../models/tree.model';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
import * as _ from 'lodash';
var includes = _.includes, pick = _.pick;
var TreeComponent = /** @class */ (function () {
    function TreeComponent(treeModel, treeDraggedElement, renderer) {
        var _this = this;
        this.treeModel = treeModel;
        this.treeDraggedElement = treeDraggedElement;
        this.renderer = renderer;
        treeModel.eventNames.forEach(function (name) { return _this[name] = new EventEmitter(); });
        treeModel.subscribeToState(function (state) { return _this.stateChange.emit(state); });
    }
    Object.defineProperty(TreeComponent.prototype, "nodes", {
        // Will be handled in ngOnChanges
        set: function (nodes) { },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeComponent.prototype, "options", {
        set: function (options) { },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeComponent.prototype, "focused", {
        set: function (value) {
            this.treeModel.setFocus(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeComponent.prototype, "state", {
        set: function (state) {
            this.treeModel.setState(state);
        },
        enumerable: true,
        configurable: true
    });
    TreeComponent.prototype.onKeydown = function ($event) {
        if (!this.treeModel.isFocused)
            return;
        if (includes(['input', 'textarea'], document.activeElement.tagName.toLowerCase()))
            return;
        var focusedNode = this.treeModel.getFocusedNode();
        this.treeModel.performKeyAction(focusedNode, $event);
    };
    TreeComponent.prototype.onMousedown = function ($event) {
        var insideClick = this.renderer.invokeElementMethod($event.target, 'closest', ['Tree']);
        if (!insideClick) {
            this.treeModel.setFocus(false);
        }
    };
    TreeComponent.prototype.ngOnChanges = function (changes) {
        this.treeModel.setData({
            options: changes.options && changes.options.currentValue,
            nodes: changes.nodes && changes.nodes.currentValue,
            events: pick(this, this.treeModel.eventNames)
        });
    };
    TreeComponent.prototype.sizeChanged = function () {
        this.viewportComponent.setViewport();
    };
    TreeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'Tree, tree-root',
                    providers: [TreeModel],
                    styles: [],
                    template: "\n    <tree-viewport #viewport>\n      <div\n        class=\"angular-tree-component\"\n        [class.node-dragging]=\"treeDraggedElement.isDragging()\"\n        [class.angular-tree-component-rtl]=\"treeModel.options.rtl\">\n        <tree-node-collection\n          *ngIf=\"treeModel.roots\"\n          [nodes]=\"treeModel.roots\"\n          [treeModel]=\"treeModel\"\n          [templates]=\"{\n            loadingTemplate: loadingTemplate,\n            treeNodeTemplate: treeNodeTemplate,\n            treeNodeWrapperTemplate: treeNodeWrapperTemplate,\n            treeNodeFullTemplate: treeNodeFullTemplate\n          }\">\n        </tree-node-collection>\n        <tree-node-drop-slot\n          class=\"empty-tree-drop-slot\"\n          *ngIf=\"treeModel.isEmptyTree()\"\n          [dropIndex]=\"0\"\n          [node]=\"treeModel.virtualRoot\">\n        </tree-node-drop-slot>\n      </div>\n    </tree-viewport>\n  "
                },] },
    ];
    /** @nocollapse */
    TreeComponent.ctorParameters = function () { return [
        { type: TreeModel, },
        { type: TreeDraggedElement, },
        { type: Renderer, },
    ]; };
    TreeComponent.propDecorators = {
        'loadingTemplate': [{ type: ContentChild, args: ['loadingTemplate',] },],
        'treeNodeTemplate': [{ type: ContentChild, args: ['treeNodeTemplate',] },],
        'treeNodeWrapperTemplate': [{ type: ContentChild, args: ['treeNodeWrapperTemplate',] },],
        'treeNodeFullTemplate': [{ type: ContentChild, args: ['treeNodeFullTemplate',] },],
        'viewportComponent': [{ type: ViewChild, args: ['viewport',] },],
        'nodes': [{ type: Input },],
        'options': [{ type: Input },],
        'focused': [{ type: Input },],
        'state': [{ type: Input },],
        'toggleExpanded': [{ type: Output },],
        'activate': [{ type: Output },],
        'deactivate': [{ type: Output },],
        'select': [{ type: Output },],
        'deselect': [{ type: Output },],
        'focus': [{ type: Output },],
        'blur': [{ type: Output },],
        'updateData': [{ type: Output },],
        'initialized': [{ type: Output },],
        'moveNode': [{ type: Output },],
        'copyNode': [{ type: Output },],
        'loadNodeChildren': [{ type: Output },],
        'changeFilter': [{ type: Output },],
        'event': [{ type: Output },],
        'stateChange': [{ type: Output },],
        'onKeydown': [{ type: HostListener, args: ['body: keydown', ['$event'],] },],
        'onMousedown': [{ type: HostListener, args: ['body: mousedown', ['$event'],] },],
    };
    return TreeComponent;
}());
export { TreeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3RyZWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsS0FBQSxFQUFPLE1BQUEsRUFBbUIsWUFBQSxFQUFjLFFBQUEsRUFDaEMsWUFBQSxFQUEyQixZQUFBLEVBQWMsU0FBQSxFQUM3RCxNQUFNLGVBQUEsQ0FBZ0I7QUFDdkIsT0FBTyxFQUFFLFNBQUEsRUFBVSxNQUFPLHNCQUFBLENBQXVCO0FBRWpELE9BQU8sRUFBRSxrQkFBQSxFQUFtQixNQUFPLHNDQUFBLENBQXVDO0FBSTFFLE9BQU8sS0FBSyxDQUFBLE1BQU8sUUFBQSxDQUFTO0FBRXBCLElBQUEscUJBQUEsRUFBVSxhQUFBLENBQVk7QUFHOUI7SUFzQ0UsdUJBQ1MsU0FBb0IsRUFDcEIsa0JBQXNDLEVBQ3JDLFFBQWtCO1FBSDVCLGlCQU9DO1FBTlEsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3JDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFFeEIsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxZQUFZLEVBQUUsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO1FBQ3hFLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUE1QixDQUE0QixDQUFDLENBQUM7SUFDeEUsQ0FBQztJQWxDQSxzQkFBSSxnQ0FBSztRQURWLGlDQUFpQzthQUNoQyxVQUFVLEtBQVksSUFBSSxDQUFDOzs7T0FBQTtJQUFBLENBQUM7SUFDNUIsc0JBQUksa0NBQU87YUFBWCxVQUFZLE9BQW9CLElBQUksQ0FBQzs7O09BQUE7SUFBQSxDQUFDO0lBRXRDLHNCQUFJLGtDQUFPO2FBQVgs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QUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN2QyxjQUFjLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUM1QixhQUFhLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNsQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUcsRUFBRSxFQUFFO1FBQzdFLGFBQWEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFHLEVBQUUsRUFBRTtLQUNoRixDQUFDO0lBQ0Ysb0JBQUM7Q0FqSkQsQUFpSkMsSUFBQTtTQWpKWSxhQUFhIiwiZmlsZSI6InRyZWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBPbkNoYW5nZXMsIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb24sIENvbnRlbnRDaGlsZCwgVGVtcGxhdGVSZWYsIEhvc3RMaXN0ZW5lciwgVmlld0NoaWxkXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyZWVNb2RlbCB9IGZyb20gJy4uL21vZGVscy90cmVlLm1vZGVsJztcclxuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcclxuaW1wb3J0IHsgVHJlZURyYWdnZWRFbGVtZW50IH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtZHJhZ2dlZC1lbGVtZW50Lm1vZGVsJztcclxuaW1wb3J0IHsgVHJlZU9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1vcHRpb25zLm1vZGVsJztcclxuaW1wb3J0IHsgVHJlZVZpZXdwb3J0Q29tcG9uZW50IH0gZnJvbSAnLi90cmVlLXZpZXdwb3J0LmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5jb25zdCB7IGluY2x1ZGVzLCBwaWNrIH0gID0gXztcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVHJlZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgX25vZGVzOiBhbnlbXTtcclxuICBfb3B0aW9uczogVHJlZU9wdGlvbnM7XHJcblxyXG4gICBsb2FkaW5nVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgIHRyZWVOb2RlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgIHRyZWVOb2RlV3JhcHBlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICB0cmVlTm9kZUZ1bGxUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgdmlld3BvcnRDb21wb25lbnQ6IFRyZWVWaWV3cG9ydENvbXBvbmVudDtcclxuXHJcbiAgLy8gV2lsbCBiZSBoYW5kbGVkIGluIG5nT25DaGFuZ2VzXHJcbiAgIHNldCBub2Rlcyhub2RlczogYW55W10pIHsgfTtcclxuICAgc2V0IG9wdGlvbnMob3B0aW9uczogVHJlZU9wdGlvbnMpIHsgfTtcclxuXHJcbiAgIHNldCBmb2N1c2VkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXRGb2N1cyh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAgc2V0IHN0YXRlKHN0YXRlKSB7XHJcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXRTdGF0ZShzdGF0ZSk7XHJcbiAgfVxyXG5cclxuICAgdG9nZ2xlRXhwYW5kZWQ7XHJcbiAgIGFjdGl2YXRlO1xyXG4gICBkZWFjdGl2YXRlO1xyXG4gICBzZWxlY3Q7XHJcbiAgIGRlc2VsZWN0O1xyXG4gICBmb2N1cztcclxuICAgYmx1cjtcclxuICAgdXBkYXRlRGF0YTtcclxuICAgaW5pdGlhbGl6ZWQ7XHJcbiAgIG1vdmVOb2RlO1xyXG4gICBjb3B5Tm9kZTtcclxuICAgbG9hZE5vZGVDaGlsZHJlbjtcclxuICAgY2hhbmdlRmlsdGVyO1xyXG4gICBldmVudDtcclxuICAgc3RhdGVDaGFuZ2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHRyZWVNb2RlbDogVHJlZU1vZGVsLFxyXG4gICAgcHVibGljIHRyZWVEcmFnZ2VkRWxlbWVudDogVHJlZURyYWdnZWRFbGVtZW50LFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIpIHtcclxuXHJcbiAgICAgIHRyZWVNb2RlbC5ldmVudE5hbWVzLmZvckVhY2goKG5hbWUpID0+IHRoaXNbbmFtZV0gPSBuZXcgRXZlbnRFbWl0dGVyKCkpO1xyXG4gICAgICB0cmVlTW9kZWwuc3Vic2NyaWJlVG9TdGF0ZSgoc3RhdGUpID0+IHRoaXMuc3RhdGVDaGFuZ2UuZW1pdChzdGF0ZSkpO1xyXG4gIH1cclxuXHJcbiAgXHJcbiAgb25LZXlkb3duKCRldmVudCkge1xyXG4gICAgaWYgKCF0aGlzLnRyZWVNb2RlbC5pc0ZvY3VzZWQpIHJldHVybjtcclxuICAgIGlmIChpbmNsdWRlcyhbJ2lucHV0JywgJ3RleHRhcmVhJ10sXHJcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgZm9jdXNlZE5vZGUgPSB0aGlzLnRyZWVNb2RlbC5nZXRGb2N1c2VkTm9kZSgpO1xyXG5cclxuICAgIHRoaXMudHJlZU1vZGVsLnBlcmZvcm1LZXlBY3Rpb24oZm9jdXNlZE5vZGUsICRldmVudCk7XHJcbiAgfVxyXG5cclxuICBcclxuICBvbk1vdXNlZG93bigkZXZlbnQpIHtcclxuICAgIGNvbnN0IGluc2lkZUNsaWNrID0gdGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKCRldmVudC50YXJnZXQsICdjbG9zZXN0JywgWydUcmVlJ10pO1xyXG5cclxuICAgIGlmICghaW5zaWRlQ2xpY2spIHtcclxuICAgICAgdGhpcy50cmVlTW9kZWwuc2V0Rm9jdXMoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlcykge1xyXG4gICAgdGhpcy50cmVlTW9kZWwuc2V0RGF0YSh7XHJcbiAgICAgIG9wdGlvbnM6IGNoYW5nZXMub3B0aW9ucyAmJiBjaGFuZ2VzLm9wdGlvbnMuY3VycmVudFZhbHVlLFxyXG4gICAgICBub2RlczogY2hhbmdlcy5ub2RlcyAmJiBjaGFuZ2VzLm5vZGVzLmN1cnJlbnRWYWx1ZSxcclxuICAgICAgZXZlbnRzOiBwaWNrKHRoaXMsIHRoaXMudHJlZU1vZGVsLmV2ZW50TmFtZXMpXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNpemVDaGFuZ2VkKCkge1xyXG4gICAgdGhpcy52aWV3cG9ydENvbXBvbmVudC5zZXRWaWV3cG9ydCgpO1xyXG4gIH1cclxuc3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogQ29tcG9uZW50LCBhcmdzOiBbe1xyXG4gIHNlbGVjdG9yOiAnVHJlZSwgdHJlZS1yb290JyxcclxuICBwcm92aWRlcnM6IFtUcmVlTW9kZWxdLFxyXG4gIHN0eWxlczogW10sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDx0cmVlLXZpZXdwb3J0ICN2aWV3cG9ydD5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzPVwiYW5ndWxhci10cmVlLWNvbXBvbmVudFwiXHJcbiAgICAgICAgW2NsYXNzLm5vZGUtZHJhZ2dpbmddPVwidHJlZURyYWdnZWRFbGVtZW50LmlzRHJhZ2dpbmcoKVwiXHJcbiAgICAgICAgW2NsYXNzLmFuZ3VsYXItdHJlZS1jb21wb25lbnQtcnRsXT1cInRyZWVNb2RlbC5vcHRpb25zLnJ0bFwiPlxyXG4gICAgICAgIDx0cmVlLW5vZGUtY29sbGVjdGlvblxyXG4gICAgICAgICAgKm5nSWY9XCJ0cmVlTW9kZWwucm9vdHNcIlxyXG4gICAgICAgICAgW25vZGVzXT1cInRyZWVNb2RlbC5yb290c1wiXHJcbiAgICAgICAgICBbdHJlZU1vZGVsXT1cInRyZWVNb2RlbFwiXHJcbiAgICAgICAgICBbdGVtcGxhdGVzXT1cIntcclxuICAgICAgICAgICAgbG9hZGluZ1RlbXBsYXRlOiBsb2FkaW5nVGVtcGxhdGUsXHJcbiAgICAgICAgICAgIHRyZWVOb2RlVGVtcGxhdGU6IHRyZWVOb2RlVGVtcGxhdGUsXHJcbiAgICAgICAgICAgIHRyZWVOb2RlV3JhcHBlclRlbXBsYXRlOiB0cmVlTm9kZVdyYXBwZXJUZW1wbGF0ZSxcclxuICAgICAgICAgICAgdHJlZU5vZGVGdWxsVGVtcGxhdGU6IHRyZWVOb2RlRnVsbFRlbXBsYXRlXHJcbiAgICAgICAgICB9XCI+XHJcbiAgICAgICAgPC90cmVlLW5vZGUtY29sbGVjdGlvbj5cclxuICAgICAgICA8dHJlZS1ub2RlLWRyb3Atc2xvdFxyXG4gICAgICAgICAgY2xhc3M9XCJlbXB0eS10cmVlLWRyb3Atc2xvdFwiXHJcbiAgICAgICAgICAqbmdJZj1cInRyZWVNb2RlbC5pc0VtcHR5VHJlZSgpXCJcclxuICAgICAgICAgIFtkcm9wSW5kZXhdPVwiMFwiXHJcbiAgICAgICAgICBbbm9kZV09XCJ0cmVlTW9kZWwudmlydHVhbFJvb3RcIj5cclxuICAgICAgICA8L3RyZWUtbm9kZS1kcm9wLXNsb3Q+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC90cmVlLXZpZXdwb3J0PlxyXG4gIGBcclxufSwgXSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuc3RhdGljIGN0b3JQYXJhbWV0ZXJzOiAoKSA9PiAoe3R5cGU6IGFueSwgZGVjb3JhdG9ycz86IERlY29yYXRvckludm9jYXRpb25bXX18bnVsbClbXSA9ICgpID0+IFtcbnt0eXBlOiBUcmVlTW9kZWwsIH0sXG57dHlwZTogVHJlZURyYWdnZWRFbGVtZW50LCB9LFxue3R5cGU6IFJlbmRlcmVyLCB9LFxuXTtcbnN0YXRpYyBwcm9wRGVjb3JhdG9yczoge1trZXk6IHN0cmluZ106IERlY29yYXRvckludm9jYXRpb25bXX0gPSB7XG4nbG9hZGluZ1RlbXBsYXRlJzogW3sgdHlwZTogQ29udGVudENoaWxkLCBhcmdzOiBbJ2xvYWRpbmdUZW1wbGF0ZScsIF0gfSxdLFxuJ3RyZWVOb2RlVGVtcGxhdGUnOiBbeyB0eXBlOiBDb250ZW50Q2hpbGQsIGFyZ3M6IFsndHJlZU5vZGVUZW1wbGF0ZScsIF0gfSxdLFxuJ3RyZWVOb2RlV3JhcHBlclRlbXBsYXRlJzogW3sgdHlwZTogQ29udGVudENoaWxkLCBhcmdzOiBbJ3RyZWVOb2RlV3JhcHBlclRlbXBsYXRlJywgXSB9LF0sXG4ndHJlZU5vZGVGdWxsVGVtcGxhdGUnOiBbeyB0eXBlOiBDb250ZW50Q2hpbGQsIGFyZ3M6IFsndHJlZU5vZGVGdWxsVGVtcGxhdGUnLCBdIH0sXSxcbid2aWV3cG9ydENvbXBvbmVudCc6IFt7IHR5cGU6IFZpZXdDaGlsZCwgYXJnczogWyd2aWV3cG9ydCcsIF0gfSxdLFxuJ25vZGVzJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ29wdGlvbnMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4nZm9jdXNlZCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbidzdGF0ZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbid0b2dnbGVFeHBhbmRlZCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nYWN0aXZhdGUnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ2RlYWN0aXZhdGUnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ3NlbGVjdCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nZGVzZWxlY3QnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ2ZvY3VzJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidibHVyJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbid1cGRhdGVEYXRhJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidpbml0aWFsaXplZCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nbW92ZU5vZGUnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ2NvcHlOb2RlJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidsb2FkTm9kZUNoaWxkcmVuJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidjaGFuZ2VGaWx0ZXInOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuJ2V2ZW50JzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidzdGF0ZUNoYW5nZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nb25LZXlkb3duJzogW3sgdHlwZTogSG9zdExpc3RlbmVyLCBhcmdzOiBbJ2JvZHk6IGtleWRvd24nLCBbJyRldmVudCddLCBdIH0sXSxcbidvbk1vdXNlZG93bic6IFt7IHR5cGU6IEhvc3RMaXN0ZW5lciwgYXJnczogWydib2R5OiBtb3VzZWRvd24nLCBbJyRldmVudCddLCBdIH0sXSxcbn07XG59XHJcblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19