class SpaceTilesController < APIController

  def update
    tile = SpaceTile.at(params[:coord_string])
    if tile.present?
      if tile.update(space_tile_params)
        render json: tile
      else
        render status: 500, json: { errors: tile.errors.full_messages }
      end
    else
      render status: 400, json: { errors: ["Tile does not exist at that location."] }
    end
  end

  def show
    render json: SpaceTile.for(params[:coord_string])
  end

  private

  def space_tile_params
    params.require(:space_tile).permit(:x, :y, :true_coords, :discoverer_id)
  end

end
