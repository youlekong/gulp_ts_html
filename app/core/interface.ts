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
    closePre: boolean
}

/**
 * 界面类接口
 */
interface viewBase {
    /**是否播放动画 */
    animation: boolean;
    isCloseAnimation: boolean;
    /**模板名称 */
    name: string;
    /**是否已经添加 */
    isAdd: boolean;
    /**是否缓存数据=>可以避免每次打开界面都去请求最新的数据，可以根据需求修改 */
    storage: boolean;
    /**数据 => 默认数据主要储存来自服务器的界面数据 */
    data: any;
    /**打开界面时带入的数据 */
    dataSource: any;
    /**模板 */
    template: any;
    add(parent: ZeptoCollection): void;
    /**播放加入到场景动画 */
    openAnimation(): void;
    /**播放移除到场景动画 */
    closeAnimation(): void;
    /**从父级删除 */
    remove(): void;
}

/**
 * 坐标
 */
interface pos {
    x: number,
    y: number
}

/**
 * api接口协议
 */
interface apiData {
    /**方法名称 */
    name: string,
    /**地址 */
    url: string
}

declare var TWEEN: any
declare var lazyload: any



