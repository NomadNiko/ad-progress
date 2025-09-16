import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs backgroundColor={"#ff0000ff"} iconColor={"#0011ffff"}>
      {/* Tab 1 */}
      <NativeTabs.Trigger name="index">
        <Label hidden>Tab1</Label>
        <Icon
          selectedColor="#3cff00ff"
          sf={{
            default: "suit.heart",
            selected: "suit.heart.fill",
          }}
        />
      </NativeTabs.Trigger>

      {/* Tab 2 */}
      <NativeTabs.Trigger name="tab2">
        <NativeTabs.Trigger.TabBar backgroundColor="blue" />
        <Icon
          selectedColor="#0ff7ffff"
          sf={{
            default: "suit.diamond",
            selected: "suit.diamond.fill",
          }}
        />
        <Label hidden>Tab2</Label>
      </NativeTabs.Trigger>

      {/* Tab 3 */}
      <NativeTabs.Trigger name="tab3">
        <NativeTabs.Trigger.TabBar backgroundColor="blue" />
        <Icon
          selectedColor="#eeff00ff"
          sf={{
            default: "suit.club",
            selected: "suit.club.fill",
          }}
        />
        <Label hidden>Tab3</Label>
      </NativeTabs.Trigger>
      {/* Tab 4 */}
      <NativeTabs.Trigger name="tab4">
        <NativeTabs.Trigger.TabBar backgroundColor="blue" />
        <Icon
          selectedColor="#ff0fcbff"
          sf={{
            default: "suit.spade",
            selected: "suit.spade.fill",
          }}
        />
        <Label hidden>Tab3</Label>
      </NativeTabs.Trigger>
      {/* End */}
    </NativeTabs>
  );
}
