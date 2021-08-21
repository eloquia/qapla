import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserProfile {
  id: number;
  email: string;
}

const EMPTY_PROFILE: UserProfile = {
  id: 0,
  email: '',
};

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileSubject_: BehaviorSubject<UserProfile> =
    new BehaviorSubject<UserProfile>(EMPTY_PROFILE);

  constructor() {}

  public setProfile(profile: UserProfile): void {
    this.profileSubject_.next(profile);
  }

  public getUserId(): number {
    const user = sessionStorage.getItem('user');
    if (!user) {
      
    } else {
      const parsed = JSON.parse(user);
      const userId = parsed.userId;
      return userId;
    }
    return this.profileSubject_.value.id;
  }
}
