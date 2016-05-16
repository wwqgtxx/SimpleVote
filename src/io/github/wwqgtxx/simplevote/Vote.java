package io.github.wwqgtxx.simplevote;

/**
 * Created by Administrator on 2016/5/16.
 */
public class Vote {
    private String name;
    private String team1;
    private String team2;
    private boolean isFinished;
    private String vote;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTeam1() {
        return team1;
    }

    public void setTeam1(String team1) {
        this.team1 = team1;
    }

    public String getTeam2() {
        return team2;
    }

    public void setTeam2(String team2) {
        this.team2 = team2;
    }

    public boolean isFinished() {
        return isFinished;
    }

    public void setIsFinished(boolean isFinished) {
        this.isFinished = isFinished;
    }

    public String getVote() {
        return vote;
    }

    public void setVote(String vote) {
        this.vote = vote;
    }

    @Override
    public int hashCode(){
        return name.hashCode();
    }

}
