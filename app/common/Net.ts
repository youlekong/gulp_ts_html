import Config from "./Config";
import Core from "../core/Core";
import EventType from "./EventType";

/**
 * api地址
 */
export class Api {
    /**首页 */
    static index: apiData = { name: 'index', url: Config.baseUrl }
    /**首页 场次列表 */
    static roomList: apiData = { name: 'roomList', url: Config.baseUrl + '/room/list/' }
    /** 场次详情  */
    static roomInfo: apiData = { name: 'roomInfo', url: Config.baseUrl + '/room/info/' }
}

/**
 * 网络通讯层 => 从服务器获取需要的数据都用这个接口
 */
export class Net {
    /**
     * 获取数据
     * @param name 方法名称
     * @param d  要带入的数据
     */
    static async getData(api: apiData, d?: any) {
        if (!api) return null;
        let parameter = '';
        if (d) {
            for (let i in d) {
                parameter += '/' + i + '-' + d[i];
            }
        }
        let data = await Core.utils.ajax({ url: api.url + parameter, dataType: 'json' });
        if (!data) {
            console.error(api.name + ' 没有数据返回!')
            return null;
        }
        if (data['code']) {//code不为零算异常处理
            Core.eventManager.event(EventType.error, data);
            return null;
        }
        console.log('%c <== ' + api.name, 'color:rgba(27, 144, 4, 1);font-weight:700;background-color:rgba(0,0,0, 0.1)', data['mes']);
        return data['mes'];
    }
}