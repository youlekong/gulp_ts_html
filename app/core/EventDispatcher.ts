/**
 * 事件分发
 */
export default class EventDispatcher {

    /** 已经绑定事件列表 */
    private static list: any = {};

    /**
     * 派发事件
     * @param type 事件类型
     * @param (可选) 回调数据
     */
    static event(type: string, data?: any): void {
        let list: any[] = this.list[type];
        if (list) {
            for (let x = list.length - 1; x > -1; x--) {
                list[x](data);
            }
        }
    }

    /**
     * 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知
     * @param type type 事件类型
     * @param listener 事件侦听函数
     */
    static on(type: string, listener: any): void {
        if (!this.list[type]) {//检测是否已经绑定过事件
            this.list[type] = [];
        }
        this.list[type].push(listener);
    }

    /**
     * 对象移除指定类型的事件侦听器对象，
     * @param type 
     * @param listener 
     */
    static off(type: string, listener: Function): void {
        let list: any[] = this.list[type];
        if (list) {
            for (let x = list.length - 1; x > -1; x--) {
                if (list[x] == listener) list.splice(x, 1);
            }
        }
    }
}