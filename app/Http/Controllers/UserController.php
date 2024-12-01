<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Models\User;

class UserController extends Controller
{
    //function to insert a new user
    public function insert(UserRequest $request){
        //If all the validation is right then proceed for insertion
        $validatedData = $request->validated();
        $user = new User;
        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];
        $user->password = $validatedData['password'];
        $user->dob = $validatedData['dob'];
        if($user->save()){
            return response()->json(['msg'=>'Data inserted successfully!'], 200);
        }
        else{
            return response()->json(['msg'=>['errors'=>'Something went wrong']], 400);
        }
    }

    //Function to return all users list
    public function display(){
        $users = User::select(['id','name','email','dob'])->get();
        if($users){
            return response()->json(['data'=>$users],200);
        }
    }

    ///Function to delete the user
    public function delete_user(Request $request)
    {
        $id = $request['id'];
        $user = User::find($id);
        if($user->delete()){
            return response()->json(['msg'=>'Data deleted successfully!'], 200);
        }else{
            return response()->json(['msg'=>['errors'=>'Something went wrong']], 400);
        }
    }


    //Function to edit the user
    function edit_user(Request $request){
        $id = $request['id'];
        $user = User::select(['id','name','email','dob'])->where('id',$id)->get();
        $user_details = $user->toArray();
        if(!empty($user_details)){
            return response()->json(['data'=>$user_details], 200);
        }else{
            return response()->json(['msg'=>['errors'=>'Something went wrong']], 400);
        }
    }

    //Function to update the user details
    function update_user(UserRequest $request){
        $validatedData = $request->validated();
        $id = $request['id'];
        $user = User::find($id);
        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];
        $user->dob = $validatedData['dob'];
        if($user->save()){
            return response()->json(['msg'=>'Data updated successfully!'], 200);
        }else{
            return response()->json(['msg'=>['errors'=>'Something went wrong']], 400);
        }
    }
}
