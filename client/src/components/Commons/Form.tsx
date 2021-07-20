import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRegister } from '../../useAuth'
import { State } from '../../useAuth'

//import { useHistory } from 'react-router-dom'

export interface IFormProps {
    children?: React.ReactNode
    onClick?: (e: any) => void
}
export const Form = (props: IFormProps) => {
    //let history = useHistory()
    const registerUser = useRegister()

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<State>({
        mode: 'onChange',
    })
    const onSubmit: SubmitHandler<State> = (data, e) => {
        e?.target.reset()
        console.log(data)
        registerUser({ ...data, password: 'secret', verify: true })
    }

    return (
        <div className="form__group">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form__field">
                    <input
                        className="form-register_field"
                        placeholder="Full Name"
                        defaultValue=""
                        type="text"
                        {...register('name')}
                    />
                </div>
                <div className="form__field">
                    <input
                        className="form-register_field"
                        placeholder="Email Adress"
                        defaultValue=""
                        type="email"
                        {...register('email')}
                    />
                </div>
                <div className="form__field">
                    <input
                        className="form-register_field"
                        placeholder="Password"
                        {...register('confirmEmail', {
                            required: true,
                            validate: () =>
                                getValues('email') ===
                                getValues('confirmEmail'),
                        })}
                    />
                    <div style={{ color: 'red' }}>
                        {errors.confirmEmail && (
                            <span>
                                <small>Emails don't Match</small>
                            </span>
                        )}
                    </div>
                </div>
                <button className="figma_button_continue" type="submit">
                    <span className="figma_button_text">CONTINUE</span>
                </button>
            </form>
        </div>
    )
}

export default Form
