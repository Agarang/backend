import { TypeToSelect } from 'src/utils/types/type-to-select.type';

export interface UserEntity {
  /**
   * @type int
   */
  id: number;

  /**
   * @format email
   */
  email: string;

  /**
   * 비밀번호는 10자 이상 30자 이하, 영문+숫자+특수문자의 조합
   */
  password: string;

  /**
   * @pattern [a-zA-Zㄱ-힣]{3,10}
   */
  nickname: string;

  /**
   * @pattern [a-zA-Zㄱ-힣]{1,}
   */
  name: string;

  /**
   * @format date-time
   */
  birthday: string;

  /**
   * @pattern (010|011)-(\d{3,4})-(\d{4})
   */
  phoneNumber: string;

  /**
   * @format date-time
   */
  babyDue: string;

  /**
   * @format date-time
   */
  pregnancyDay: string | null;

  /**
   * @pattern [a-zA-Zㄱ-힣]{1,}
   */
  fetusNickname: string;

  height: number | null;

  weight: number | null;

  profilePhotoUrl: string | null;

  /**
   * @format date-time
   */
  createdAt: string | null;

  /**
   * @format date-time
   */
  updatedAt: string | null;

  /**
   * @format date-time
   */
  deletedAt: string | null;
}
