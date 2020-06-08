
import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if(!point) {
      return response.status(400).json({ message: 'Point not found.' });
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    return response.json({ point, items });
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = request.body;
  
    const trx = await knex.transaction();

    const point = {
      image: 'image-fake',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    }
  
    const [pointId] = await trx('points').insert(point);
  
    const pointItems = items.map((itemId: Number) => ({
      item_id: itemId,
      point_id: pointId
    }))
    
    await trx('point_items').insert(pointItems);
  
    return response.json({ 
      id: pointId,
      ...point
    });
  }
}

export default PointsController;