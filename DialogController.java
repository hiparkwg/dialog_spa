package kr.jobtc.dialog_spa;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DialogController {
    @RequestMapping(path="/dialog", method=RequestMethod.POST)
    public Map<String, Object> dialog(DialogData param){
        Map<String, Object> returnMap = new HashMap<>();

        System.out.println(param.getNal());
        System.out.println(param.getCode());
        System.out.println(param.getCodeName());
        System.out.println(param.getEa());
        System.out.println(param.getPrice());
        System.out.println(param.getAmt());

        returnMap.put("message", "모두 처리되었습니다.");

        return returnMap;
    }
}
