@extends("admin::layouts.master")

@section("content")

    <form action="" method="post">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                <h2>
                    <i class="fa fa-folder"></i>
                    {{ $category ? trans("categories::categories.edit") : trans("categories::categories.add_new") }}
                </h2>
                <ol class="breadcrumb">
                    <li>
                        <a href="{{ route("admin") }}">{{ trans("admin::common.admin") }}</a>
                    </li>
                    <li>
                        <a href="{{ route("admin.categories.show") }}">{{ trans("categories::categories.categories") }}</a>
                    </li>
                    <li class="active">
                        <strong>
                            {{ $category ? trans("categories::categories.edit") : trans("categories::categories.add_new") }}
                        </strong>
                    </li>
                </ol>
            </div>
            <div class="col-lg-8 col-md-6 col-sm-6 col-xs-12 text-right">

                @if ($category)
                    <a href="{{ route("admin.categories.create") }}"
                       class="btn btn-primary btn-labeled btn-main"> <span
                            class="btn-label icon fa fa-plus"></span>
                        &nbsp; {{ trans("categories::categories.add_new") }}</a>
                @endif

                <button type="submit" class="btn btn-flat btn-danger btn-main">
                    <i class="fa fa-download" aria-hidden="true"></i>
                    {{ trans("categories::categories.save_category") }}
                </button>

            </div>
        </div>

        <div class="wrapper wrapper-content fadeInRight">

            @include("admin::partials.messages")

            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            <div class="row">
                <div class="col-md-8">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <div class="form-group">
                                <label
                                    for="input-name">{{ trans("categories::categories.attributes.name") }}</label>
                                <input name="name" type="text"
                                       value="{{ @Request::old("name", $category->name) }}"
                                       class="form-control" id="input-name"
                                       placeholder="{{ trans("categories::categories.attributes.name") }}">
                            </div>

                            <div class="form-group">
                                <label
                                    for="input-slug">{{ trans("categories::categories.attributes.slug") }}</label>
                                <input name="slug" type="text"
                                       value="{{ @Request::old("slug", $category->slug) }}"
                                       class="form-control" id="input-slug"
                                       placeholder="{{ trans("categories::categories.attributes.slug") }}">
                            </div>


                            <div class="form-group">
                                <label
                                    for="input-name">{{ trans("categories::categories.attributes.parent") }}</label>
                                <select name="parent" class="form-control chosen-select chosen-rtl">
                                    <option
                                        value="0">{{ trans("categories::categories.parent_category") }}</option>
                                    <?php
                                    echo Dot\Categories\Models\Category::tree(array(
                                        "row" => function ($row, $depth) use ($category) {
                                            $html = '<option value="' . $row->id . '"';
                                            if ($category and $category->parent == $row->id) {
                                                $html .= 'selected="selected"';
                                            }
                                            $html .= '>' . str_repeat("&nbsp;", $depth * 10) . " - " . $row->name . '</option>';

                                            if (!$category or ($category and $category->id != $row->id)) {
                                                return $html;
                                            }
                                        }
                                    ));
                                    ?>
                                </select>
                            </div>

                        </div>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">
                                <p>{{trans('categories::categories.block')}}</p>
                            </h3>
                        </div>
                        <div class="panel-body">
                            <div class="col-sm-push-2 col-sm-8 ui-front">
                                <input type="search" name="items" id="group-items" class="form-control"
                                       title="{{trans('categories::categories.item-search')}}"
                                       placeholder="{{trans('categories::categories.item-search')}}"
                                       required="required"/>

                                <hr>
                            </div>

                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="table-responsive">
                                        <table class="table table-hover">
                                            <thead>
                                            <tr>
                                                <th>{{trans('posts::posts.attributes.title')}}</th>
                                                <th>{{trans('posts::posts.brand')}}</th>
                                                <th>{{trans('posts::posts.attributes.status')}}</th>
                                                <th>{{trans('posts::posts.attributes.image_id')}}</th>
                                            </tr>
                                            </thead>
                                            <tbody id="sortable">
                                            @if(!empty($category->posts))
                                                @foreach($category->posts as $post)
                                                    <tr id="item-{{$post->id}}" class="items">
                                                        <input type="hidden" name="items[]" value="{{$post->id}}">
                                                        <td class="title">{{$post->title}}</td>
                                                        <td>{{$post->brand->title or '-'}}</td>
                                                        <td><span
                                                                class="label label-{{$post->status==0?'warning':'success'}}">
                                                                {{$post->status==0?trans('posts::posts.unconfirmed'):
                                                                trans('posts::posts.confirmed')}}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <img class="img-responsive"
                                                                 src="{{$post->image_id?thumbnail($post->image->path):'/plugins/admin/default/image.png'}}"/>
                                                        </td>
                                                        <td>
                                                            <a href="javascript:void(0)" class="close">
                                                                <i class="fa fa-times" hidden="true"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                @endforeach
                                            @endif
                                            </tbody>
                                        </table>
                                        <p class="no-record" style="display: {{empty($category->posts)?'block':'none'}}">{{ trans("posts::posts.no_records") }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">

                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <i class="fa fa-picture-o"></i>
                            {{ trans("categories::categories.add_image") }}
                        </div>
                        <div class="panel-body form-group">
                            <div class="row post-image-block">
                                <input type="hidden" name="image_id" class="post-image-id" value="
                                {{ ($category and @$category->image->path != "") ? @$category->image->id : 0 }}">
                                <a class="change-post-image label" href="javascript:void(0)">
                                    <i class="fa fa-pencil text-navy"></i>
                                    {{ trans("categories::categories.change_image") }}
                                </a>
                                <a class="post-image-preview" href="javascript:void(0)">
                                    <img width="100%" height="130px" class="post-image"
                                         src="{{ ($category and @$category->image->id != "") ? thumbnail(@$category->image->path) : assets("admin::default/image.png") }}">
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    </form>

@stop

@section('head')

    <link rel="stylesheet" href="{{assets('admin::css/plugins/jQueryUI/jquery-ui-1.10.4.custom.min.css')}}">
    <style>
        .ui-autocomplete {
            list-style-type: none;
            padding: 0 !important;
        }

        .ui-autocomplete li {
            padding: 5px;
            border-bottom: 1px solid grey;
        }

        a.ui-corner-all {
            width: 100%;
            display: block;
        }

        a.ui-corner-all:hover {
            color: white;
            background: #1e8cbe;
            border-color: #1e8cbe;
            border-radius: 3px;
        }

        .img-responsive {
            height: 72px;
            width: 72px;
        }

        .label-success {
            background-color: #5cb85c;
        }

        .no-record {
            margin: auto;

        }

        .ui-state-highlight-2 {
            height: 90px;
            background-color: #ddd;
        }

        .close {
            position: relative;
            top: 20px;
            right: 20px;
        }
    </style>
@endsection
@section("footer")

    <script>
        $(document).ready(function () {

            $(".change-post-image").filemanager({
                panel: "media",
                types: "image",
                done: function (result, base) {
                    if (result.length) {
                        var file = result[0];
                        base.parents(".post-image-block").find(".post-image-id").first().val(file.id);
                        base.parents(".post-image-block").find(".post-image").first().attr("src", file.thumbnail);
                    }
                },
                error: function (media_path) {
                    alert_box("{{ trans("categories::categories.not_allowed_file") }}");
                }
            });

            $("#group-items").on("keydown", function (event) {
                if (event.keyCode === $.ui.keyCode.TAB &&
                    $(this).autocomplete("instance").menu.active) {
                    event.preventDefault();
                }
            }).autocomplete({
                source: function (request, response) {
                    $.getJSON("{{route('admin.posts.show')}}", {
                        q: request.term
                    }, function (data) {
                        var newData = data.map(function (e) {
                            return {
                                label: e.title, value: e.title,
                                item: e
                            }
                        });
                        response(newData);
                    });
                },
                search: function () {
                    // custom minLength
                    var term = this.value;
                    if (term.length < 2) {
                        return false;
                    }
                },
                focus: function () {
                    // prevent value inserted on focus
                    return false;
                },
                select: function (event, ui) {
                    this.value = "";
                    $('#sortable').prepend();
                    $("#sortable").sortable("refresh");
                    $('.no-record').fadeOut();
                    return false;
                },

            });

            function createItem(item) {
                return '<tr id="item-1" class="items" style="display: table-row;">\n' +
                    '<input type="hidden" name="items[]" value="1" style="">\n' +
                    '<td class="title">Test item</td>\n' +
                    '<td>text</td>\n' +
                    '<td><span class="label label-success">Confirmed' +
                    '                                                            </span>\n' +
                    '                                                        </td>\n' +
                    '                                                        <td>\n' +
                    '                                                            <img class="img-responsive" src="http://modisti.local/uploads/2018/03/thumbnail-2887556827112145120.jpg">\n' +
                    '                                                        </td>\n' +
                    '                                                        <td>\n' +
                    '                                                            <a href="javascript:void(0)" class="close">\n' +
                    '                                                                <i class="fa fa-times" hidden="true"></i>\n' +
                    '                                                            </a>\n' +
                    '                                                        </td>\n' +
                    '</tr>';
            }
            $("#sortable").sortable({
                placeholder: "ui-state-highlight-2",
                axis: "y",
                opacity: 0.7,
                cursor: "move",
                helper: function (e, tr) {
                    var $originals = tr.children();
                    var $helper = tr.clone();
                    $helper.children().each(function (index) {
                        // Set helper cell sizes to match the original sizes
                        $(this).width($originals.eq(index).width());
                    });
                    return $helper;
                },

            });
            $("#sortable").disableSelection();

            $('table').on('click', '.close', function () {

                if($('#sortable tr').length==1){
                    $('.no-record').fadeIn();
                }
                $(this).closest('tr').fadeOut().remove();
            })
        });
    </script>
@stop
