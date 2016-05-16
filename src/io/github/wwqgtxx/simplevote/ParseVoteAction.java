package io.github.wwqgtxx.simplevote;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import com.opensymphony.xwork2.ActionSupport;
import org.apache.struts2.json.annotations.JSON;

/**
 * Created by Administrator on 2016/5/16.
 */
public class ParseVoteAction extends ActionSupport{

    public Vote getVote() {
        return vote;
    }

    public void setVote(Vote vote) {
        this.vote = vote;
    }

    private Vote vote;
    private Map<String,Object> dataMap= new HashMap<>();
    private static ConcurrentHashMap<String,Vote> voteMap = DataSave.getVoteMap();


    public String doSet() {
        if (vote == null){
            dataMap.put("success", false);
            dataMap.put("info", "vote == null!");
            dataMap.put("timestamp", System.currentTimeMillis());
            return ERROR;
        }
        Vote mapVote = voteMap.get(vote.getName());
        if (mapVote==null)
            voteMap.put(vote.getName(),vote);
        else{
            if (vote.getTeam1() != null)
                mapVote.setTeam1(vote.getTeam1());
            if (vote.getTeam2() != null)
                mapVote.setTeam2(vote.getTeam2());
            mapVote.setIsFinished(vote.isFinished());
            if (vote.getVote() != null)
                mapVote.setVote(vote.getVote());
        }
        long timestamp = System.currentTimeMillis();
        dataMap.put("voteList", voteMap);
        dataMap.put("success", true);
        dataMap.put("LastTimestamp",DataSave.getLastTimestamp());
        dataMap.put("timestamp",timestamp );
        DataSave.setLastTimestamp(timestamp);
        return SUCCESS;

    }
    public String doGet() {
        dataMap.put("voteList", voteMap);
        dataMap.put("success", true);
        dataMap.put("LastTimestamp",DataSave.getLastTimestamp());
        dataMap.put("timestamp", System.currentTimeMillis());
        return SUCCESS;

    }

    public Map<String, Object> getDataMap() {
        return dataMap;
    }

    //设置key属性不作为json的内容返回
    //@JSON(serialize=false)
//    public String getKey() {
//        return key;
//    }


}
