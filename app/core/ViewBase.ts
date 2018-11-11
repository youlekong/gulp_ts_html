import Base from "./Base";
import { throws } from "assert";

export default class ViewBase extends Base implements viewBase {

    /**
     * 生命周期
     * 名称 异步模板 添加到场景
     */

    /**模板名称名称 (要是独一的，防止id冲突) */
    name: any;

    animation: boolean = true;

    /**模板数据 */
    private _template: string;
    get template() {
        return this._template;
    }
    set template(d: any) {
        this._template = d.replace(/\<div/, `<div id=${this.name} `);///^\<div/
        this.onCreate();
    }

    /** 当前节点 */
    node: ZeptoCollection;

    onAwake() {
        console.log(222)
    }

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
        // this.node = parent.querySelector(`#${this.name}`);
        this.node = $(`#${this.name}`);
        if (this.node) this.node.on('click', (e) => {
            this.onClick(e);
        });//绑定点击事件
        this.onEnable();
        this.update();
    }

    /**
     * 打开界面时的动画
     */
    openAnimation() {
        this.node.css({ opacity: 0, transform: 'translateX(1.5rem)' });
        this.node.animate({
            opacity: 1,
            transform: 'translateX(0)'
        }, 400, 'ease-out');

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


    private update() {// TODO 这个设计有点问题，因为每次实例的时候都会创建一个，后期需要优化成只创建一个
        //每帧执行一次
        requestAnimationFrame(() => {
            this.update();
        });
        this.onUpdate();
    }

    /**
     * 每帧执行一次
     */
    onUpdate() {

    }


    /**
     * 场景删除
     */
    remove() {
        this.onRemove();
    }

    /**
     * 从场景移除
     */
    onRemove() {
        this.node.off('click');//绑定点击事件
    }
}