interface ajaxData {
    src: string;
    /**规定要发送到服务器的数据。 */
    data?: any;
    /**规定请求的类型（GET 或 POST） */
    type: string;
    /**	预期的服务器响应的数据类型。 */
    dataType?: string;
    /** 成功回调 */
    success?: Function;
}

/**
 * 界面配置结构 
 */
interface viewConfig {
    /**界面名称 */
    name: string;
    /**界面类 */
    class: any;
    /** 模板路径 */
    skin: string;
    /** 是否关闭上一个场景 */
    closePre:boolean
}

/**
 * 界面类接口
 */
interface viewBase {
    /**是否播放动画 */
    animation:boolean;
    isCloseAnimation:boolean;
    /**模板名称 */
    name:string;
    /**是否已经添加 */
    isAdd:boolean;
    /**模板 */
    template: any;
    add(parent: ZeptoCollection): void;
    /**播放加入到场景动画 */
    openAnimation(): void;
    /**播放移除到场景动画 */
    closeAnimation(): void;
    /**从父级删除 */
    remove():void;
}

/**
 * 坐标
 */
interface pos {
    x:number,
    y:number
}

declare var TWEEN: any



