import { useClockRotate } from "../hooks/useClockRotate";

interface AnimatedClockProps {
  speed?: number;
  size?: number;
}

export default function AnimatedClock2({
  speed = 1,
  size = 300,
}: AnimatedClockProps) {
  const { ClockComponent } = useClockRotate({
    baseImage: require("../assets/images/Clock_Base_02.png"),
    hourImage: require("../assets/images/Clock_Hour_02.png"),
    minuteImage: require("../assets/images/Clock_Minute_02.png"),
    speed,
    size,
  });

  return <ClockComponent />;
}
