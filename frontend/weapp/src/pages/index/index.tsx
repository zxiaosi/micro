import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.less";

export default function Index() {
  useLoad((query) => {
    const scene = decodeURIComponent(query.scene);
    console.log("Page loaded.", scene);
  });

  return (
    <View className="index">
      <Text>Hello world!</Text>
    </View>
  );
}
