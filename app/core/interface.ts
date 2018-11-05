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