import { db } from '../db_connection/DbConnection';
import { UserInterface } from '../types/User.interface';
import { Request, Response } from 'express';
export class UserControllers {

  constructor() {
  }

  public findALlUsers = async (req: Request, res:Response) => {
    try {
      db.query('SELECT * FROM users', async (error, data, fields) => {
        if (error) {
          throw error
        }
        const users :UserInterface[] = data;
        await res.status(200).json(users);
      })
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  public findOneUser = async (req: Request, res:Response) => {
    const id: number = +req.params.id;
    try {
      db.query(`SELECT * FROM users WHERE iduser =${id}`, async (error, data) => {
        if (error) {
          throw error
        }
        const user :UserInterface = data;
        await res.status(200).json(user);
      })
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  public createUser = async (req: Request, res:Response) => {

    const newUser: UserInterface = {
      ...req.body
    }

    try {
      db.query("INSERT INTO users SET ?", newUser, async (error, user) => {
        if (error) {
          throw error
        }
        console.log(1)
        await res.status(201).json({newUser, id: user.insertId});
      })
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  public updateUser = async (req: Request, res:Response) => {
    const id = +req.params.id;
    const modifUser = {
      ...req.body
    }
    delete modifUser.iduser;
    try {
      db.query("UPDATE users SET ? WHERE users.iduser = ?", [modifUser, id], async (error, user) => {
        if (error) {
          throw error
        }
        await res.status(200).json(modifUser);
      })
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  public deleteUser = async (req: Request, res:Response) => {
    try {
      const id: number = +req.params.id;
      db.query("DELETE FROM users WHERE iduser = ?", id, async (error, user) => {
        if (error || user.affectedRows < 1) {
          throw error
        }
        await res.status(200).json("user is deleted !!!");
      })
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

}

