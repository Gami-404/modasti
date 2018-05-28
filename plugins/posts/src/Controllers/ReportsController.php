<?php

namespace Dot\Posts\Controllers;

use Action;
use Dot\Posts\Models\Report;
use Illuminate\Support\Facades\Auth;
use Dot\Platform\Controller;
use Redirect;
use Request;
use View;


/**
 * Class PostsController
 * @package Dot\Posts\Controllers
 */
class ReportsController extends Controller
{

    /**
     * View payload
     * @var array
     */
    protected $data = [];


    /**
     * Show all questions
     * @return mixed
     */
    function index()
    {

        if (Request::isMethod("post")) {
            if (Request::filled("action")) {
                switch (Request::get("action")) {
                    case "delete":
                        return $this->delete();
                    case "activate":
                        return $this->status(1);
                    case "deactivate":
                        return $this->status(0);
                }
            }
        }

        $this->data["sort"] = (Request::filled("sort")) ? Request::get("sort") : "created_at";
        $this->data["order"] = (Request::filled("order")) ? Request::get("order") : "DESC";
        $this->data['per_page'] = (Request::filled("per_page")) ? Request::get("per_page") : NULL;

        $query = Report::orderBy($this->data["sort"], $this->data["order"]);


        if (Request::filled("from")) {
            $query->where("created_at", ">=", Request::get("from"));
        }

        if (Request::filled("to")) {
            $query->where("created_at", "<=", Request::get("to"));
        }

        if (Request::filled("user_id")) {
            $query->whereHas("user", function ($query) {
                $query->where("users.id", Request::get("user_id"));
            });
        }
        if (Request::filled("q")) {
            $query->search(urldecode(Request::get("q")));
        }
        $this->data["reports"] = $query->paginate($this->data['per_page']);



        return View::make("posts::reports.show", $this->data);
    }

    /**
     * Delete post by id
     * @return mixed
     */
    public function delete()
    {
        $ids = Request::get("id");

        $ids = is_array($ids) ? $ids : [$ids];

        foreach ($ids as $ID) {

            $question = Report::findOrFail($ID);

            // Fire deleting action

            Action::fire("post.report.deleting", $question);

            $question->delete();

            // Fire deleted action

            Action::fire("post.report.deleted", $question);
        }

        return Redirect::back()->with("message", trans("posts::reports.events.deleted"));
    }

    /**
     * Edit post by id
     * @param $id
     * @return mixed
     */
    public function details($id)
    {

        $question = Report::findOrFail($id);

        if (Request::isMethod("post")) {

            $question->title = Request::get('title');
            $question->answer = Request::get('answer');
            $question->status = Request::get('status',0);


            // Fire saving action

            Action::fire("report.saving", $question);

            if (!$question->validate()) {
                return Redirect::back()->withErrors($question->errors())->withInput(Request::all());
            }

            $question->save();
            // Fire saved action

            Action::fire("report.saved", $question);

            return Redirect::route("admin.posts.reports.edit", array("id" => $id))->with("message", trans("posts::reports.events.updated"));
        }

        $this->data["report"] = $question;
        return View::make("posts::reports.details", $this->data);
    }

}
