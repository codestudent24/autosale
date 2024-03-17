'use client'

import { FC, useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";
import ru from "react-phone-input-2/lang/ru.json";
import 'react-phone-input-2/lib/style.css';
import styles from './postForm.module.scss';

const PostForm: FC = () => {
  const [phone, setPhone] = useState<string>('')
  const [name, setName] = useState<string>('')

  const TextAreaRef = useRef<HTMLTextAreaElement>(null)

  return (
    <>
      <div className={styles.form}>
        <h1>Форма обратной связи</h1>
        <div>
          <h3>Имя</h3>
          <input
            type="text"
            placeholder="Как к Вам обращаться?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles["input-name"]}
          />
        </div>
        <div>
          <h3>Номер телефона</h3>
          <PhoneInput
            value={phone}
            onChange={nextPhoneState => setPhone(nextPhoneState)}
            preferredCountries={['ru']}
            localization={ru}
            placeholder="+7 (999) 000-00-00"
            inputStyle={{
              fontWeight: 700,
              color: '#303030',
              fontSize: '1.25rem',
              width: '360px',
            }}
            dropdownStyle={{
              color: '#303030',
            }}
          />
        </div>
        <div>
          <h3>Краткое описание</h3>
          <textarea
            placeholder="Укажите марку, год выпуска и техническое состояние автомобиля, другие существенные комментарии"
            minLength={10}
            maxLength={300}
            cols={40}
            rows={10}
            required
            ref={TextAreaRef}
          />
        </div>
        <button>Оставить заявку</button>
      </div>
    </>
  )
}

export default PostForm