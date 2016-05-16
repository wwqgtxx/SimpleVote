package io.github.wwqgtxx.simplevote;

/**
 * Created by Administrator on 2016/5/16.
 */
public class User{
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    String name;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    String password;
}