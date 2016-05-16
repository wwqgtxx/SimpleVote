package io.github.wwqgtxx.simplevote;

import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by Administrator on 2016/5/16.
 */
public class DataSave {
    public static ConcurrentHashMap<String, Vote> getVoteMap() {
        return voteMap;
    }

    private static ConcurrentHashMap<String,Vote> voteMap= new ConcurrentHashMap<>();

    public static long getLastTimestamp() {
        return lastTimestamp;
    }

    public static void setLastTimestamp(long lastTimestamp) {
        DataSave.lastTimestamp = lastTimestamp;
    }

    private static long lastTimestamp;

}
