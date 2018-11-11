
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
}