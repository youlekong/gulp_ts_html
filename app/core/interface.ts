interface ajaxData {
    src: string,
    /**规定要发送到服务器的数据。 */
    data?: any,
    /**规定请求的类型（GET 或 POST） */
    type: string,
    /**	预期的服务器响应的数据类型。 */
    dataType?: string,
    /** 成功回调 */
    success?: Function
}

/**
 * 界面配置结构 
 */
interface viewConfig {
    /**界面名称 */
    name: string,
    /**界面类 */
    class: any,
    /** 模板路径 */
    skin: string
}

/**
 * 界面类接口
 */
interface viewBase {
    name:string,
    template: any,
    add(parent: HTMLDivElement): void,
    openAnimation(): void
}


