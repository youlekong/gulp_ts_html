
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
}