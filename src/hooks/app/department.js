import router from "@/router";
import {getFormStepDriver, setFormFiledValue} from "@/hooks/form/useForm";
import {loading_modal} from "@/hooks/app/varables";

export async function changeInput(val,field,step_id,commit){
    let obj = {
        step_id: step_id,
        driver_id: router.currentRoute.value.params.id,
        fields:[
            {
                field_id: field.id,
                values: [
                    val
                ]
            }
        ]
    }
    let obj2 = {
        driver_id: router.currentRoute.value.params.id,
        step_id: step_id
    };
    if(field.label !== 'Comments' && commit && val.length) await setFormFiledValue(obj)
    if(field.label === 'Comments' && commit && val.length) {
        loading_modal.value = true;
        if (field.values) field.values.forEach(e => obj.fields[0].values.push(e.value));
        await setFormFiledValue(obj)
        await getFormStepDriver(obj2)
        loading_modal.value = false
    }
}


export function changeRadio (val,field,step_id,fields, child='simple'){
    let obj = {
        step_id: step_id,
        driver_id: router.currentRoute.value.params.id,
        fields:[]
    }
    if(child === 'dif')
        obj.fields.push({
            field_id: field.id,
            values: [val]
        })

    if(child === 'child') fields.forEach(i=>{
        obj.fields.push({
            field_id: i.id,
            values: [val]
        })
    })
    if(child === 'simple') fields.forEach(i=>{
        obj.fields.push({
            field_id: i.id,
            values: [field.id]
        })
    })

    // let data =
    setFormFiledValue(obj)
    if(child === 'simple') {
        return fields.map(i => {
            i.values[0].value = field.id
            return i
        })
    }
}
