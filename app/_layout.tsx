import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs iconColor="red" blurEffect="dark">
      {/* Tab 1 */}
      <NativeTabs.Trigger name="index">
        <Label hidden>Tab1</Label>
        <Icon
          selectedColor="black"
          sf={{
            default: "tent.2.fill",
            selected: "tent.2",
          }}
        />
      </NativeTabs.Trigger>

      {/* Tab 2 */}
      <NativeTabs.Trigger name="tab2">
        <NativeTabs.Trigger.TabBar backgroundColor="blue" />
        <Icon
          selectedColor="black"
          sf={{
            default: "tent.fill",
            selected: "tent",
          }}
        />
        <Label hidden>Tab2</Label>
      </NativeTabs.Trigger>

      {/* Tab 3 */}
      <NativeTabs.Trigger name="tab3">
        <NativeTabs.Trigger.TabBar backgroundColor="blue" />
        <Icon
          selectedColor="black"
          sf={{
            default: "tent.fill",
            selected: "tent",
          }}
        />
        <Label hidden>Tab3</Label>
      </NativeTabs.Trigger>
      {/* End */}
    </NativeTabs>
  );
}
