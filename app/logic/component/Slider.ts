/**
 * 轮播图组件
 */
export default class Slider {

    /** 容器 */
    private box: ZeptoCollection;
    /** a标签列表 */
    private sliderList: ZeptoCollection;
    /**当前图的下标 */
    private currentIndex: number = 0;
    /**最大宽度  */
    private maxWidth: number;
    /**触摸 */
    private touch: boolean = false;
    /**按下时的手指位置 */
    private oldTouchX: number;
    /**按下时当前精灵滑动的位置 */
    private oldMoveX: number;
    /**当前x位置 */
    private currentX: number = 0;

    /**
     * 轮播图组件
     * @param id 容器id
     */
    constructor(id: string) {
        this.box = $(id);
        this.sliderList = this.box.find('a');
        this.maxWidth = this.box.width();

        this.box.on('touchstart', (e) => this.onTouchStart(e));
        this.box.on('touchmove', (e) => this.onTouchMove(e));
        this.box.on('touchend', (e) => this.onTouchEnd(e));

        this.init();
    }

    /**
     * 初始化
     */
    private init() {
        this.showSlider(this.currentIndex);
    }

    /**
     * 显示第几张并移动到指定位置
     * @param eq 下标
     * @param x 需要移动的x位置
     */
    private showSlider(eq: number, x?: number) {
        // this.sliderList.eq(eq).css({ display: 'inline-block' }).animate({ transform: `translateX(${x ? x + '%' : 0})` }, 400);

        this.sliderList.eq(eq).css({
            display: 'inline-block',
            transform: `translateX(${x ? x + '%' : 0})`
        });
    }

    /**
     * 触摸开始
     */
    private onTouchStart(e: Event) {
        this.touch = true;
        let node: ZeptoCollection = $(e.target);
        this.currentIndex = node.index();
        node.css({ zIndex: 999 });
        this.oldTouchX = e['changedTouches'][0]['pageX'];
        this.oldMoveX = this.conversionX(this.sliderList.eq(this.currentIndex));
        this.setMoveCss(false);
        return;
    }

    /**
     * 滑动
     */
    private onTouchMove(e: Event) {
        if (this.touch) {

            let x: number = (e['changedTouches'][0]['pageX'] - this.oldTouchX) / this.maxWidth;//触摸点转换成宽度比例
            let currentX: number = this.oldMoveX + x * 100;
            this.sliderMove(this.currentIndex, currentX);

            //向右滑动 左边数下一个
            let next = this.currentIndex - 1;
            if (next < 0) next = this.sliderList.length - 1;
            this.sliderMove(next, currentX - 100);
            //向左滑动 右边数下一个
            next = this.currentIndex + 1;
            if (next > this.sliderList.length - 1) next = 0;
            this.sliderMove(next, 100 + currentX);

            this.currentX = x;

            // console.log(x, currentX);
        }
    }

    /**
     * 触摸结束
     */
    private onTouchEnd(e: Event) {
        this.touch = false;
        if (!this.currentX) return;
        this.setMoveCss(true);
        //向右滑动 左边数下一个
        if (this.currentX < -0.3) {//向左滑动
            this.showSlider(this.currentIndex, -100);
            this.showSlider(this.next(2), 0);
            // this.sliderMove(this.next(1), 100);
        } else if (this.currentX > 0.3) {//向右滑动
            this.showSlider(this.currentIndex, 100);
            this.showSlider(this.next(1), 0);
            // this.sliderMove(this.next(2), 100);
        } else {//回到原点
            this.showSlider(this.currentIndex, 0);
            this.showSlider(this.next(1), -100);
            this.showSlider(this.next(2), 100);
        }
    }

    /**
     * 获取相对的下一个下标
     * @param type 1 向右滑动 左边数下一个 2 向左滑动 右边数下一个
     */
    private next(type: number): number {
        let next: number;
        if (type === 1) {
            next = this.currentIndex - 1;
            if (next < 0) next = this.sliderList.length - 1;
        } else {
            next = this.currentIndex + 1;
            if (next > this.sliderList.length - 1) next = 0;
        }
        return next
    }

    /**
     * 根据下标 图片移动到指定位置
     * @param eq 下标
     * @param x 目标位置
     */
    private sliderMove(eq: number, x: number) {
        this.sliderList.eq(eq).css({
            display: 'inline-block',
            transform: `translateX(${x}%)`
        });
    }

    /**
     * 转换transform的值
     */
    private conversionX(node: ZeptoCollection): number {
        return parseFloat(node.css('transform').match(/[0-9|.|\-]+/g)[0]);
    }

    /**
     * 设置移动css属性
     * @param type true 添加  false 移除
     */
    private setMoveCss(type: boolean) {
        let list = this.sliderList;
        for(let x = list.length - 1; x > -1; x--){
            if(type){
                $(list[x]).addClass('banner-move');
            }else{
                $(list[x]).removeClass('banner-move');
            }
        }
    }

    /**
     * 停止轮播
     */
}