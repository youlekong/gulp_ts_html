/** 
 * 城市选择
*/
export default class PPicker 
{
    private el: ZeptoCollection;
    private p: any;
    // private firstArea: any;
    // private secArea: any;
    // private thirdArea: any;z

    constructor(id: string) {

        this.el = $(`#${id}`);
        this.el.on('click', _ => this.onClick());

        this.p = new Picker({
            data: [this.firstArea, this.secArea, this.thirdArea],
            selectedIndex: [0, 0, 0],
            title: '地址选择'
        });
    }

    private onClick() {
        this.p.show();
    }

    get firstArea() {
        return [
            {
                text: '小美',
                value: 1
            }, {
                text: '猪猪',
                value: 2
            }
        ];
    }

    get secArea() {
        return [
            {
                text: '张三',
                value: 1
            },
            {
                text: '李四',
                value: 2
            },
            {
                text: '王五',
                value: 3
            },
        ];
    }

    get thirdArea() {
        return [
            {
		text: '开心',
		value: 1
	}, {
		text: '生气',
		value: 2
	},
	{
		text: '搞笑',
		value: 3
	}, {
		text: '难过',
		value: 4
	}
        ];
    }

}