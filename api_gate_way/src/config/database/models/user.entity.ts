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
   * @pattern ^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,30}$
   * 비밀번호는 10자 이상 30자 이하, 영문+숫자+특수문자의 조합
   */
  password: string;

  /**
   * [a-zA-Zㄱ-힣]{3,}
   * 넥네임은 3글자 이상
   */
  nickname: string;

  /**
   * [a-zA-Zㄱ-힣]{1,}
   * 이름은 1글자 이상
   */
  name: string;

  /**
   * @format date
   */
  birthday: string;

  /**
   * @format (010|011)-(\d{3,4})-(\d{4})
   * 핸드폰 번호는 (010 또는 011) - (3~4글자) - (4글자)
   */
  phoneNumber: string;

  /**
   * @format date
   * 출산 예정일
   */
  babyDue: string;

  /**
   * @format date
   * 임신일
   */
  pregnancyDay: string | null;

  /**
   * [a-zA-Zㄱ-힣]{1,}
   * 태명은 1글자 이상
   */
  fetusNickname: string | null;

  height: number | null;

  weight: number | null;

  prfilePhotoUrl: string | null;

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
