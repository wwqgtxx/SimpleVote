package io.github.wwqgtxx.simplevote;

/**
 * Created by Administrator on 2016/5/18.
 */
public class DanMu {
    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    private String sender;

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    private String time;
    private String message;

    public String toString(){
        return "<"+super.toString()+"[sender=\""+sender+"\",message=\""+message+"\"]>";
    }
}
