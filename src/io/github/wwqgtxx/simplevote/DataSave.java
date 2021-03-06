package io.github.wwqgtxx.simplevote;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Created by Administrator on 2016/5/16.
 */
public class DataSave {
    public static ConcurrentHashMap<String, Vote> getVoteMap() {
        return voteMap;
    }

    private static ConcurrentHashMap<String,Vote> voteMap= new ConcurrentHashMap<>();

    private static long lastVoteTimestamp;

    public static long getLastDanMuTimestamp() {
        return lastDanMuTimestamp;
    }

    public static void setLastDanMuTimestamp(long lastDanMuTimestamp) {
        DataSave.lastDanMuTimestamp = lastDanMuTimestamp;
    }

    public static long getLastVoteTimestamp() {
        return lastVoteTimestamp;
    }

    public static void setLastVoteTimestamp(long lastVoteTimestamp) {
        DataSave.lastVoteTimestamp = lastVoteTimestamp;
    }

    private static long lastDanMuTimestamp;

    public static CopyOnWriteArrayList<DanMu> getDanMuList() {
        return danMuList;
    }

    public static CopyOnWriteArrayList<DanMu> danMuList = new CopyOnWriteArrayList<>();


}
