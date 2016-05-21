package io.github.wwqgtxx.simplevote;

import com.opensymphony.xwork2.ActionSupport;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Created by Administrator on 2016/5/16.
 */
public class ParseDanMuAction extends ActionSupport{

    public DanMu getDanMu() {
        return danMu;
    }

    public void setDanMu(DanMu danMu) {
        this.danMu = danMu;
    }

    private DanMu danMu;


    private int begin;

    public int getEnd() {
        return end;
    }

    public void setEnd(int end) {
        this.end = end;
    }

    public int getBegin() {
        return begin;
    }

    public void setBegin(int begin) {
        this.begin = begin;
    }

    private int end;
    private Map<String,Object> dataMap= new HashMap<>();
    private static CopyOnWriteArrayList<DanMu> danMuList = DataSave.getDanMuList();


    public String doAdd() {
        if (danMu == null){
            dataMap.put("success", false);
            dataMap.put("info", "danMu  == null!");
            dataMap.put("timestamp", System.currentTimeMillis());
            return ERROR;
        }
        long timestamp = System.currentTimeMillis();
        danMuList.add(danMu);
        DataSave.setLastDanMuTimestamp(timestamp);
        return doGet();

    }
    public String doGet() {
        parseEnd();
        if (!danMuList.isEmpty())
            dataMap.put("danMuList", danMuList.subList(begin,end));
        else
            dataMap.put("danMuList", danMuList);
        dataMap.put("success", true);
        dataMap.put("lastTimestamp",DataSave.getLastDanMuTimestamp());
        dataMap.put("timestamp", System.currentTimeMillis());
        return SUCCESS;

    }

    public String doClean() {
        danMuList.clear();
        long timestamp = System.currentTimeMillis();
        DataSave.setLastDanMuTimestamp(timestamp);
        return doGet();
    }

    public Map<String, Object> getDataMap() {
        return dataMap;
    }

    private void parseEnd (){
        if (!danMuList.isEmpty())
            if (end == 0)
                end = danMuList.size();
            if (end > (danMuList.size()))
                end = danMuList.size();
        //System.out.println("end="+end);
    }


}
