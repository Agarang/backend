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
   * @pattern [a-zA-Zㄱ-힣]{3,}
   */
  nickname: string;

  /**
   * @pattern [a-zA-Zㄱ-힣]{1,}
   */
  name: string;

  /**
   * @format date
   */
  birthday: string;

  /**
   * @pattern (010|011)-(\d{3,4})-(\d{4})
   */
  phoneNumber: string;

  /**
   * @format date
   */
  babyDue: string;

  /**
   * @format date
   */
  pregnancyDay: string | null;

  /**
   * @pattern [a-zA-Zㄱ-힣]{1,}
   */
  fetusNickname: string | null;

  height: number | null;

  weight: number | null;

  profilePhotoUrl: string | null;

  /**
   * @format date
   */
  createdAt: string | null;

  /**
   * @format date
   */
  updatedAt: string | null;

  /**
   * @format date
   */
  deletedAt: string | null;
}
