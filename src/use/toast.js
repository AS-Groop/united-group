import messages from "@/use/messages";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';


const $toast = useToast();

export default function toast (mess, status){
    switch (status){
        case 'success':
            return $toast.success(messages[mess])
        case 'error':
            return $toast.error(messages[mess])
        case 'warning':
            return $toast.warning(messages[mess])
        case 'info':
            return $toast.info(messages[mess])
        default:
            return $toast.default(messages[mess])
    }
}

