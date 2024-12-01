<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        //If it is create_user route then only password should be mandatory
        $isCreate = $this->route()->getName() === 'create_user';
        return [
            'name' => 'required',
            'email' => 'required|email',
            'password' => $isCreate ? 'required' : 'nullable',
            'dob' => 'required'
        ];
    }
}
