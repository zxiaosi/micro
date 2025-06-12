import { View, Text, Button } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.less";
import { useState } from "react";

export default function Index() {
  const [scene, setScene] = useState("");

  useLoad((query) => {
    const newScene = decodeURIComponent(query.scene);
    console.log("Page loaded.", newScene);
    setScene(newScene);
    Taro.request({
      method: "POST",
      url: `http://localhost:8080/api/weapp/updateQrcodeStatus?scene=${newScene}&code=${1}`,
    });
  });

  const handleLogin = () => {
    Taro.request({
      method: "POST",
      url: `http://localhost:8080/api/weapp/updateQrcodeStatus?scene=${scene}&code=${2}`,
    });
  };

  const handleCancel = () => {
    Taro.request({
      method: "POST",
      url: `http://localhost:8080/api/weapp/updateQrcodeStatus?scene=${scene}&code=${3}`,
    });
  };

  return (
    <View className="index">
      <Text>Hello world! - {scene}</Text>
      <Button type="primary" onClick={handleLogin}>
        登录
      </Button>
      <Button type="warn" onClick={handleCancel}>
        取消登录
      </Button>
    </View>
  );
}
