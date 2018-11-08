import Base from "./Base";
import Core from "./Core";

export default class ViewBase extends Base implements viewBase {

    /**
     * 生命周期
     * 名称 异步模板 添加到场景
     */

    /**模板名称名称 (要是独一的，防止id冲突) */
    name: any;

    /**模板数据 */
    private _template: string;
    get template() {
        return this._template;
    }
    set template(d: any) {
        this._template = d.replace(/^\<div[\s\>]/, `<div id=${this.name} `);
        this.onCreate();
    }

    /** 当前节点 */
    node: HTMLElement;

    /**
     * 已经获取到模板，未添加到场景 可在这里进行数据添加
     */
    onCreate(data?: any) {

    }

    /**
     * 添加到场景
     */
    add(parent: HTMLDivElement) {
        parent.innerHTML = this._template;
        this.node = parent.querySelector(`#${this.name}`);
        if (this.node) this.node.addEventListener('click', this.onClick);//绑定点击事件
        this.onEnable();
    }

    /**
     * 打开界面时的动画
     */
    openAnimation() {

    }

    /**
     * 点击事件
     */
    onClick(e: any) {
    }

    /**
     * 已经添加到场景
     */
    onEnable() {

    }


    remove() {
        this.onRemove();
    }

    /**
     * 从场景移除
     */
    onRemove() {
        this.node.removeEventListener('click', this.onClick);//绑定点击事件
    }
}