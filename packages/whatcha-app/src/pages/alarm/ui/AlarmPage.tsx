import { MainHeader } from "@shared/main-header";
import styles from "./AlarmPage.module.css";
import { useNavigate } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { AlarmItem } from "./AlarmItem";
import { AlarmListItemDTO, deleteAlarm, getAlarms } from "@/features/alarm";

export function AlarmPage() {
  const navigate = useNavigate();

  const [alarms, setAlarms] = useState<AlarmListItemDTO[]>([]);

  const getAlarmList = useCallback(async () => {
    const response = await getAlarms();

    console.log(response);
    setAlarms(response);
  }, []);

  useEffect(() => {
    getAlarmList();
  }, [getAlarmList]);

  const handleClickBackButton = useCallback(() => {
    navigate("/mypage");
  }, [navigate]);

  const handleClickDeleteButton = useCallback(async (modelId: number) => {
    await deleteAlarm(modelId);

    setAlarms((prev) => prev.filter((alarm) => alarm.modelId !== modelId));
  }, []);

  return (
    <div className={styles.container}>
      <MainHeader
        title="입고 알림 신청 내역"
        onClickBack={handleClickBackButton}
      />
      <div className={styles.content}>
        {alarms.map((alarm) => (
          <AlarmItem
            key={alarm.userCarAlertId}
            alarm={alarm}
            onDelete={() => handleClickDeleteButton(alarm.modelId)}
          />
        ))}
      </div>
    </div>
  );
}
