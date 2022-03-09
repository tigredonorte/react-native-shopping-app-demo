import * as notifications from 'expo-notifications';
import * as taskManager from 'expo-task-manager';

interface InternalNotification {
    data?: {[s: string]: any};
    title: string;
    body: string;
}

interface ExternalNotification extends InternalNotification {
    to: string;
}

export class NotificationService {

    private static userToken: string;
    public static getUserToken = async() => {
        if (NotificationService.userToken) {
            return NotificationService.userToken;
        }
        
        const response = await notifications.getExpoPushTokenAsync();
        NotificationService.userToken = response.data;
        return NotificationService.userToken;
    }

    public static askForPermission = async() => {
        let perm = await notifications.getPermissionsAsync();
        if (!perm.granted) {
            if (!perm.canAskAgain) {
                return true;
            }

            perm = await notifications.requestPermissionsAsync();
            if (!perm.granted) {
                return false;
            }
        }
        return true;
    }

    public static sendInternalNotification = async(content: InternalNotification) => {
        await notifications.scheduleNotificationAsync({
            content,
            trigger: {
                seconds: 5
            }
        });
    }
    
    public static sendRemoteNotification = async(notification: ExternalNotification) => {
        try {
            await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Encoding': 'gzip, deflate',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(notification)
            });
        
        } catch (error) {
          console.log('error', error);
        }
    }

    public static listenNotifications = (
        callback: (notification: notifications.Notification | notifications.NotificationResponse) => void
    ): (() => void) => {
        const backgroundSubs = notifications.addNotificationResponseReceivedListener(callback);
        const foregroundSubs = notifications.addNotificationReceivedListener(callback);
        return () => {
            backgroundSubs.remove();
            foregroundSubs.remove();
        }
    }

    public static enableOnForeground = () => {
        notifications.setNotificationHandler({
            handleNotification: async(data) => ({
                shouldShowAlert: true,
                shouldPlaySound: true, 
                shouldSetBadge: true,
            })
        });
    }

    public static backgroundNotificationTask = (fn: taskManager.TaskManagerTaskExecutor) => {
        const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';
        taskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, fn);
        notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
    }
}