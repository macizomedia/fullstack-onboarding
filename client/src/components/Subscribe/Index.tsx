import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Progress from 'components/Fragments/Progress'
import Main from 'components/Fragments/Main'
import Message from 'components/Fragments/Message'

import { State, useAuthState, useSubscribe } from '../../useAuth'

import content from '../../content.json'

const Index = () => {
    const subscribeUser = useSubscribe()
    const state = useAuthState()
    const [porcentage, porcentageSet] = useState<number>(0)
    let step = porcentage / 10
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<State>({
        mode: 'onChange',
    })
    const onSubmit: SubmitHandler<State> = (data, e) => {
        e?.target.reset()
        porcentageSet(10)
        subscribeUser(data)
    }

    return (
        <div>
            <Main>
                <Progress porcentage={porcentage} />
            </Main>
            <Message
                title={content[step].hero}
                span={content[step].span}
                name={state.name!}
                text={content[step].text}
                content={content[step].message}
                foot={content[step].foot}
            />
            {step === 0 ? (
                <div className="form__group">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form__field">
                            <input
                                className="form-register_field"
                                placeholder="Full Name"
                                defaultValue=""
                                {...register('name', {
                                    required: true,
                                    maxLength: 20,
                                })}
                            />
                        </div>
                        <div className="form__field">
                            <input
                                className="form-register_field"
                                placeholder="Email Adress"
                                defaultValue=""
                                {...register('email', {
                                    pattern:
                                        /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                })}
                            />
                            <div style={{ color: 'red' }}>
                                {errors.email && (
                                    <span>
                                        <small>Enter Valid Email</small>
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="form__field">
                            <input
                                className="form-register_field"
                                placeholder="password"
                                type="password"
                                {...register('password', {
                                    required: true,
                                    minLength: 8,
                                })}
                            />
                            <div style={{ color: 'red' }}>
                                {errors.password && (
                                    <span>
                                        <small>
                                            At least 8 characters long
                                        </small>
                                    </span>
                                )}
                            </div>
                        </div>
                        <button className="figma_button_continue" type="submit">
                            <span className="figma_button_text">CONTINUE</span>
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    <h3 className="text-1">Hello</h3>
                    <button className="figma_button_continue" type="submit">
                        <span className="figma_button_text">CONTINUE</span>
                    </button>
                </div>
            )}
        </div>
    )
}

export default Index
