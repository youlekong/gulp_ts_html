/**
 * 新增地址
 */
import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import EventType from "../../common/EventType";
import ViewConfig from "../../common/ViewConfig";
import { Net, Api } from "../../common/Net";
import Picker from "../component/CityPicker";


export default class AddressLogic extends ViewBase {

  /**地址组件*/
  cityPicke: Picker;

 async onEnable() {


        this.cityPicke = new Picker();

        $('#goBack').on('click', () => {
            Core.viewManager.openView(ViewConfig.addresses);
        })
        

     /**
      * 保存
      */
     $('#saveAddr').on('click', async () => {
        let parmar={
            name:'',
            phone:'',
            province:'',
            city:'',
            area:'',
            address:'',
            flag:''
        }  
         
        parmar.name =$("#addressName").val();
        parmar.phone=$("#addressPhone").val();
        parmar.province=$("#addressLocation").data('province');
        parmar.city=$("#addressLocation").data('city');
        parmar.area=$("#addressLocation").data('area');
        parmar.address=$("#addressArea").val();
        parmar.flag = $('#switch').prop('checked')==true ? '1' :'2';
        let addressAdd = await Net.getData(Api.addressAdd,parmar);

        Core.viewManager.openView(ViewConfig.addresses,{
            cityValue:$("#addressLocation").val()
        });
     })
     
      //地址弹窗
      let picker = this.cityPicke;
      $("#addressSel").click(function(){
        //document.activeElement.blur();
         $("input[readonly='readonly']").blur();
          picker.show();     
       })

    }

}