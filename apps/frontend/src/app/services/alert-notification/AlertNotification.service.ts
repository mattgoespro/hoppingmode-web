import { Subject } from 'rxjs/internal/Subject';

export interface ErrorNotification {
  status: number;
  message: string;
}

class ErrorNotificationService {
  private notifications: ErrorNotification[] = [];
  public notify: Subject<ErrorNotification[]> = new Subject();

  public log(error) {
    const notification: ErrorNotification = {
      status: error.statusCode,
      message: this.parseErrorResponseMessage(error)
    };

    if (
      this.notifications.find(
        (n) =>
          n.status === notification.status && n.message === notification.message
      ) == null
    ) {
      this.notifications.push(notification);
      this.notify.next(this.notifications);
    }
  }

  private parseErrorResponseMessage(error) {
    const statusCode = error.response?.status;

    if (statusCode === 504 || statusCode === 401 || statusCode === 403) {
      return 'An unexpected error has occurred. Please try again.';
    }

    return error.message;
  }

  public getNotifications() {
    return this.notifications;
  }

  public remove(alert: ErrorNotification) {
    this.notifications = this.notifications.filter(
      (n) => n.status !== alert.status && n.message !== alert.message
    );
    this.notify.next(this.notifications);
  }
}

export default new ErrorNotificationService();
