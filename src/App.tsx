import React from 'react';
import { useForm, Controller } from "react-hook-form";
import {
  ThemeProvider,
  injectGlobal,
  themes,
  fonts,
  reset,
  createFilterMask,
} from '@qiwi/pijma-core';
import { TextField, PasswordField, Checkbox } from '@qiwi/pijma-desktop';

interface IFormInput {
  firstName: string;
  pwd: string;
  isActive: boolean;
}

function App() {
  const { handleSubmit, control, errors } = useForm<IFormInput>();

  return (
    <ThemeProvider theme={themes.orange}>
      <form onSubmit={handleSubmit((data) => {
        console.log(data)
      })}>
        <Controller
          name="firstName"
          control={control}
          render={(props) => (
            <TextField
              {...props}
              error={errors.firstName?.message}
              mask={createFilterMask(/[A-Za-z]/)}
            />
          )}
          rules={{
            minLength: {
              value: 3,
              message: 'Минимум три символа',
            },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: 'Только латиница'
            }
          }}
        />

        <Controller
          name="pwd"
          control={control}
          render={(props) => (
            <PasswordField
              {...props}
              viewed
              mask={createFilterMask(/[A-Za-z0-9-_]/)}
              error={errors.pwd?.message}
            />
          )}
          rules={{
            minLength: {
              value: 6,
              message: 'Минимум 6 символов',
            },
          }}
        />

        <div>
          <Controller
            name="isActive"
            control={control}
            render={({onChange, value}) => (
              <Checkbox
                label="Активность"
                checked={value}
                onChange={(v) => onChange(v)}
              />
            )}
          />
        </div>

        <input type="submit" />
      </form>
    </ThemeProvider>
  );
}

injectGlobal(fonts, reset)

export default App;
