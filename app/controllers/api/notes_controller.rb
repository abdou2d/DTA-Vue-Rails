class Api::NotesController < ApplicationController
  before_action :authenticate_api_user!

  def index
    @notes = current_api_user.notes.all
    render json: @notes
  end

  def show
    @note = Note.find(params[:id])
    render json: @note
  end

  def update
    @note = Note.find(params[:id])
    if current_api_user.id === @note.id
      @note.update_attributes!(note_params)
      render json: @note
    else
      render status: 401, json: {
        message: 'You can only edit notes that belong to you'
      }.to_json
    end
  end

  def create
    @note = current_api_user.notes.create!(note_params)
    render json: @note
  end

  def destroy
    @note = Note.find(params[:id])
    @notes = current_api_user.notes.all
    if current_api_user.id === @note.user_id
      @note.destroy
      render json: @notes
    else
      render status: 401, json: {
        message: 'You can only delete notes that belong to you'
      }.to_json
    end
  end

  private

  def note_params
    params
      .permit(:note)
  end
end
