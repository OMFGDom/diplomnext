'use client'

import Loader from '@/components/Loader';
import { useProfile } from '@/hooks/useProfile';
import styles from './Profile.module.scss';
import Image from 'next/image';
import ProfileImage from '../../../../../public/profile.png';

export function Profile() {
  const { data, isLoading } = useProfile();

  return (
    <div className={styles.profile}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.profile__info}>
          <p>
            {data?.first_name || 'Пользователь'} {data?.last_name || '1'}
          </p>
          <Image
            src={data?.profile_image || ProfileImage}
            alt="profile"
            width={40}
            height={40}
          />
        </div>
      )}
    </div>
  );
}

