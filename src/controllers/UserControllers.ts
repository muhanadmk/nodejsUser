import { db } from '../db_connection/DbConnection';
import { User } from '../types/User';
import { Request, Response } from 'express';

export class UserControllers {

  constructor() {
  }

  public findALlUsers = async (req: Request, res: Response) => {
    try {
      db.query('SELECT * FROM users', async (error, users, fields) => {
        if (error) {
          throw error
        }
        await res.status(200).json(users);
      })
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  public findOneUser = async (req: Request, res: Response) => {
    const id: number = +req.params.id;
    try {
      db.query(`SELECT * FROM users WHERE iduser =${id}`, async (error, user) => {
        if (error) {
          throw error
        }
        await res.status(200).json(user[0]);
      })
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  public createUser = async (req: Request, res: Response) => {

    const newUser: User = {
      ...req.body
    }
    try {
      db.query("INSERT INTO users SET ?", newUser, async (error, user) => {
        if (error) {
          throw error
        }
        await res.status(201).json({newUser, id: user.insertId});
      })
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  public updateUser = async (req: Request, res: Response) => {
    const modifUser = {
      ...req.body
    }
    try {
      db.query("UPDATE users SET ? WHERE iduser = ?", [modifUser, modifUser.iduser], async (error, user) => {
        if (error) {
          throw error
        }
        await res.status(200).json(modifUser);
      })
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  public deleteUser = async (req: Request, res: Response) => {
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

