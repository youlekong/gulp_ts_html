
export default class Utils {
    static async ajax(d: ZeptoAjaxSettings) {
        return await new Promise((resolve, reject) => {
            $.ajax({
                type: d.type,
                url: d.url,
                data: d.data,
                dataType: d.dataType,
                success: (data) => {
                    resolve(data);
                }

            });
        });
    }

    /**
     * 根据孤度计算坐标
     * @param angle 角度
     * @param radius 半径
     * @param center 中心点坐标
     */
    static getPositionByAngle(angle: number, radius: number, center: pos) {
        return {
            x: center.x + radius * Math.cos(angle * Math.PI / 180),
            y: center.y + radius * Math.sin(angle * Math.PI / 180)
        }
    }

    /**
     * 替换{{name}}为需要的数据 =>用于界面数据绑定
     * @param name 要替换的对应的名称
     * @param oldData 要被替换的老数据
     * @param newData 要替换的内数据
     */
    static replaseData(name: string, oldData: string, newData: string) {
        let reg = new RegExp(`{{${name}}}`);
        return oldData.replace(reg, newData)
    }
}